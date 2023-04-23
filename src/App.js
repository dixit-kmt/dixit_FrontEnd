import List from './components/List';

function App() {
  const items = [
    { text: "item1" },
    { text: "item2" },
    { text: "item3" },
    { text: "item4" },
  ];
  
  return (
    <div className="App">
      <List items={items} ></List>
    </div>
  );
}

export default App;
