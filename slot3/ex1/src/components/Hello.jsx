function Hello(){
/* {
  const helloStyle = {
    fontSize: '36px',
    color: 'black',
    fontWeight: 'normal'
  };

  const reactStyle = {
    fontSize: 48,
    color: 'blue',
    fontWeight: 'bold'
  };

  return (
    <div>
      <p style={helloStyle}>
        Hello <span style={reactStyle}>React</span>
      </p>
    </div>
  );
}
*/
return (
  <div>
    {/*
      Sử dụng trực tiếp giá trị style trong JSX
    */}
    <p style={{fontSize: '36px', color: 'black', fontWeight: 'normal'}}>
      Hello
      <span style={{fontSize: 48, color: 'blue', fontWeight: 'bold'}}>React</span>
    </p>
  </div>
);}
export default Hello;