---
title: "Benchmarks: Performance report"
---

This reports explains the results of the benchmarks found here: https://minivera.github.io/carleton-web-dev/project
/benchmark-data/table.html. Before we dive into the results, let's explain the three algorithms used for VirtualDOM.

## Algorithms
### Recursive algorithm
The recursive algorithm uses a simple `patch` function that is executed on the next animation frame when a component
 requests an update. This patch function will look at the old virtual DOM tree and compare it with the newly
 generated virtual DOM tree after the component executed the component function with the updated context. By walking
 the two trees at the same time, we compare both the old tree node and the new tree node and update the nodes in-place
 when we detect changes. We also run the DOM itself at the same time while walking the tree. We keep walking
 the tree recursively by calling the `patch` function on a node's children, if it has any.

### Iterative algorithm
Recursion in JavaScript can be notoriously problematic with recursion, as each browser have their own "stack limit
". This means that each browser will, at some point, limit the amount of function you can execute until you return.
In the case of the virtual DOM, it is unlikely a developer will create a 200000 nodes deep virtual tree. However,
the memory weight of all those call stacks can still be a problem for slower devices, and I wanted to see if an
 iterative algorithm could be lighter and quicker than a recursive algorithm

The iterative algorithm works in the same way as the recursive algorithm, but it uses a massive array to stack all
 the nodes to visit for both trees, with one stack for each trees. One difference between the two algorithms is the
 iterative algorithm will process all of a node's children before moving deeper in the tree.

### Separated diff and patch steps
The two previous algorithms modify the virtual and DOM tree in-place while the algorithm runs. This can have the
 unintended side effect of slowing down the multiple loops needed for walking the tree for complex operations, 
 slowing down the tree walk operation. Rather than slow down the tree walking, potentially causing issues in
 multiple loops at the same time, this algorithm records the needed changes in small objects called `patches` and
 returns all the patches generated once it has finished executing.

We use a new loop to loop over all those patches and execute them one by one. With this method, we can be sure
 the complex DOM and virtual DOM operations will only execute in one loop. There are some optimizations we can add to
 this algorithm that are impossible to add to the other algorithms thanks to this separation, like asynchronous
 operations.

## Report
Comparing with the two base cases, we can see that all three algorithms are slower than the vanilla js implementation.
This result is not particularly surprising as our frameworks add more complexity to the DOM operations through the
 diffing algorithms. VirtualDOM frameworks will inevitably be slower than normal DOM operations, but the added
 developer experience and functionalities far outweigh the performance loss in mose cases. This benefit is arguable,
 and I will not claim to have the right answer, but I do believe that the improves developer experience creates better
 and more stable software. The end user might see a barely noticeable slow down, but they will also see a less buggy
 and more reactive UI.

The interesting results for VirtualDOM appear when you compare the duration of each algorithms with React. We can see
 that the algorithm is often much quicker for some operations, and slightly slower for others. The remaining operations
 have durations that, if considering the confidence interval, have essentially the same duration. Overall, React is
 faster (as shown in the geometric mean compared to vanillajs), but VirtualDOM users might see some performance
 improvement when creating elements. Nothing to brag about, but [React is also relatively fast compared to other
 popular frameworks](https://krausest.github.io/js-framework-benchmark/2020/table_chrome_84.0.4147.89.html).

Another very interesting result compare to React is the far smaller memory weight and startup time. While the
 performance might not be anything to scoff at, the framework still manages that performance with a fraction of the
 weight and a similar API.

Finally, I believe that the slow down seen with VirtualDOM would be seen far less in real world apps compared to
 React. This is because VirtualDOM components update in isolation, not diffing the entire tree at once. This would
 make a difference is massive applications as React has to diff the entire tree, starting from the root, to update a
 node 30 edges deep. The benchmarking tool unfortunately does not catch those types of optimizations.

Let's go over the results fo each algorithm and see potential problems and optimizations.

### Recursive
Surprisingly, at least for me, the recursive algorithm is the fastest of all three algorithms. We can notice that
 update operations (Replace, swap, partial update) are slower than React. This is likely due to how we set attributes
 on DOM nodes. The framework will set both the attribute (`node.setAttribute`) and the property (`node['property'']`)
 on a node without checking if this is necessary. This was done so to simplify the code and make it future proof, but
 we could likely keep a reference of attribute names and simplify these operations. Modifying DOM attributes can be
 slow, as is accessing them. Another optimization could be to use the async update system we have for requesting
 updates. When a component is diffed by the algorithm, it is immediately updated rather than set to update in the
 ext animation frame, which slow down all those recursive loops.

One instance where the algorithm shines, however, is when creating elements. Especially when creating up to 10 000
 nodes, we can see that the recursive algorithm can take up to 0.6 seconds less than React! Without analysing the
 code for React fiber and comparing the performance of each line, it would be hard to theorize as to why that is the
 case. My personal guess is the weight of component updates in React, and the portability of components in VirtualDOM
 make creating each row that much faster with VirtualDOM.

Finally, we could likely optimize this algorithm by changing some of the array methods used. For example, changing
 from `concat` to `push` to add children on a virtual node made quite the difference since [concat is slower 945x
 than push](https://dev.to/uilicious/javascript-array-push-is-945x-faster-than-array-concat-1oki).

### Iterative
I naively thought a lack of recursion would make the iterative algorithm faster than the recursive alternative,
but it ended up being far slower instead. This algorithms is slower than React in all categories except the 10000
 rows one, which is an unlikely case in most apps. Furthermore, it's memory footprint is worse that the other
 algorithms, which is the opposite of the intended result.

I believe the cause of all those issues is the stack used to walk the tree. As we just saw in the previous section,
array operations can be unbelievably slow, and we use an array operation whenever an array has children. Worse, we do
 not clean the stack. The algorithm uses a simple array to implement its double stack, the `shift` function is
 extremely slow, so, to pop our element from the beginning of the stack, we would have to reverse the stack every tme
 we add children and use `pop` on it. `reverse` and `pop` might be quicker when used together, but they are still far
 slower compare to simply not cleaning the stack.

Sadly, all those consideration means that we use a lot more memory for no performance gain. We could likely improve
 this algorithm by using a better stack implementation or finding another way to walk along our two trees.

### Separated diff and patch steps
The separated algorithms fare a little worse than the recursive algorithm - with the slow downs being safely within
 the confidence interval - but this is hardly surprising. The walk algorithm is the same as the base recursive
 algorithm, but we added a new loop and potentially more operations than needed with the patches. This tells us that
 our recursive loop is barely slowed down by the DOM operations and that time would be better spent optimizing the
 recursive algorithm. In fact, my research shows that most algorithms that claim high performance have merged the
 two steps as one of their base optimizations.

One thing to note is that this algorithm does not use more memory than the base recursive, confirming our
 patches have a very small footprint and do not cause any unnecessary weight.
 
## Future of the algorithms
The benchmarks have shown that the framework's performance is acceptable and using it should not cause any
 performance issues for the users. Let's identify some areas we could work on to improve performance and detect areas
 of improvement better.

First, the report has shown that the recursive algorithm is the better algorithm to use within the framework. This is
 definitely the algorithm we should focus on when starting to work on performance.

The next step could potentially be to try to implement keys inside of the framework to improve replace, swap and
 delete performance. By giving each row a key, it can help to know the order of the diffed tree and make sure we swap
 elements rather than delete and create new ones. Another avenue of improvement are the datastructures and DOM access,
 as explained in the algorithms section.

Finally, it would be interesting to improve the benchmarking tool to take advantage of the web component aspect of
 the framework and test if rendering very complex trees and updating deep parts of the tree is faster with VirtualDOM
 compared to other frameworks like React.
