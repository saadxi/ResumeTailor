function DataDashboard() {
  const requestData = async () => {
    setloadingState(true);
    const response = await fetch('http://localhost4000/data', {
      method: 'GET',
    }).catch(error => {
      console.error(error);
    });

    return requestData;
  };

  return (
    <>
      <div>Score = {response.score}</div>
      <div>
        {response.suggestions.map(suggestion => {
          <h3> Suggestion : {suggestion}</h3>;
        })}
      </div>
      {/* <div>{}</div> */}
    </>
  );
}

export default DataDashboard;
