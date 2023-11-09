export const fetchCities = async (search: string) => {
      console.log('fetching... ', search)
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=imperial&appid=0d8073261d9e188f1f6bf1b082a805ec`;
    const res = await (
        await fetch(url, {
        method: 'GET'
   }).catch(error => { console.log(error)})
    )
   console.log('fetching...end ', res)
  return res;
  }
