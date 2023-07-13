function Construct(props) {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Meowunder Construction</h1>
        <h2>Three Paws</h2>
        <h2>
          Module: {props.info.module} Week: {props.info.week} Day:{" "}
          {props.info.day}
        </h2>
        <h2>
          by or <strong>WELL BEFORE</strong> {props.info.hour}:{props.info.min}{" "}
          Cohort Time
        </h2>
      </header>
    </div>
  );
}

export default Construct;
