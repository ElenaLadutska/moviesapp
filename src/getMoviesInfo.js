const getMoviesInfo = async(cityIndex, setData, setLoading) => {
  fetch(`https://soft.silverscreen.by:8443/wssite/webapi/event/data?filter=%7B%22city%22:${cityIndex}%7D&extended=true`)
    .then(response => response.json())
    .then(data => setData(data))
    .then(() => setLoading(false))
    .catch(error => console.log(error))
};

export default getMoviesInfo;
