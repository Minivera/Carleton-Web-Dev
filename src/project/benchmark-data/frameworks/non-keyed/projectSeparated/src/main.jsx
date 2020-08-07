/** @jsx h */
import { VirtualDOM, h } from '../../../../../src/project/vdom';
import { useSeparatedDiffer } from '../../../../../src/project/vdom/diffing/diffManager';

useSeparatedDiffer();

function random(max) {
  return Math.round(Math.random() * 1000) % max;
}

const A = ['pretty', 'large', 'big', 'small', 'tall', 'short', 'long', 'handsome', 'plain', 'quaint', 'clean',
  'elegant', 'easy', 'angry', 'crazy', 'helpful', 'mushy', 'odd', 'unsightly', 'adorable', 'important', 'inexpensive',
  'cheap', 'expensive', 'fancy'];
const C = ['red', 'yellow', 'blue', 'green', 'pink', 'brown', 'purple', 'brown', 'white', 'black', 'orange'];
const N = ['table', 'chair', 'house', 'bbq', 'desk', 'car', 'pony', 'cookie', 'sandwich', 'burger', 'pizza', 'mouse',
  'keyboard'];

let nextId = 1;

function buildData(count) {
  const data = new Array(count);
  for (let i = 0; i < count; i++) {
    data[i] = {
      id: nextId++,
      label: `${A[random(A.length)]} ${C[random(C.length)]} ${N[random(N.length)]}`,
    };
  }
  return data;
}

const GlyphIcon = <span class="glyphicon glyphicon-remove" aria-hidden="true" />;

const Button = ({ id, cb, title }) => (
  <div class="col-sm-6 smallpad">
    <button type="button" class="btn btn-primary btn-block" id={id} onclick={cb}>{title}</button>
  </div>
);

const Jumbotron = ({ run, runLots, add, update, clear, swapRows }) => (
  <div className="jumbotron">
    <div className="row">
      <div className="col-md-6">
        <h1>Project separated patch/diff non-keyed</h1>
      </div>
      <div className="col-md-6">
        <div className="row">
          <Button id="run" title="Create 1,000 rows" cb={run}/>
          <Button id="runlots" title="Create 10,000 rows" cb={runLots}/>
          <Button id="add" title="Append 1,000 rows" cb={add}/>
          <Button id="update" title="Update every 10th row" cb={update}/>
          <Button id="clear" title="Clear" cb={clear}/>
          <Button id="swaprows" title="Swap Rows" cb={swapRows}/>
        </div>
      </div>
    </div>
  </div>
);

const Main = (_, { state: { selected = 0, data = [] } = {}, setState }) => {
  const run = () => {
    setState('state', { data: buildData(1000), selected: 0 });
  };

  const runLots = () => {
    setState('state', { data: buildData(10000), selected: 0 });
  };

  const add = () => {
    setState('state', { data: data.concat(buildData(1000)), selected });
  };

  const update = () => {
    const updated = [...data];
    for (let i = 0; i < updated.length; i += 10) {
      const item = updated[i];
      updated[i] = { id: item.id, label: item.label + ' !!!' };
    }
    setState('state', { data: updated, selected });
  };

  const select = item => {
    setState('state', { data, selected: item.id });
  };

  const remove = item => {
    const withRemoval = [...data];
    withRemoval.splice(data.indexOf(item), 1);
    setState('state', { data: withRemoval, selected });
  };

  const clear = () => {
    setState('state', { data: [], selected: 0 });
  };

  const swapRows = () => {
    const swapped = [...data];
    if (swapped.length > 998) {
      const temp = swapped[1];
      swapped[1] = swapped[998];
      swapped[998] = temp;
    }
    setState('state', { data: swapped, selected });
  };

  return (
    <div class="container">
      <Jumbotron
        run={run}
        runLots={runLots}
        add={add}
        update={update}
        clear={clear}
        swapRows={swapRows}
      />
      <table class="table table-hover table-striped test-data">
        <tbody>
          {data.map(item => (
            <tr class={selected === item.id ? 'danger' : ''}>
              <td class="col-md-1">{item.id}</td>
              <td class="col-md-4">
                <a onclick={() => select(item)}>{item.label}</a>
              </td>
              <td class="col-md-1">
                <a onclick={() => remove(item)}>{GlyphIcon}</a>
              </td>
              <td class="col-md-6"></td>
            </tr>
          ))}
        </tbody>
      </table>
      <span class="preloadicon glyphicon glyphicon-remove" aria-hidden="true" />
    </div>
  );
};

new VirtualDOM(Main).renderInto(document.querySelector('#main'));
