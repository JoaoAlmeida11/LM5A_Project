export default function RequestLeague(){
    // // 
    // return axios.get('*')
    // .then(res =>{
    //   console.log(res.json())
    //   return res;
    // })
    // .catch(err => {
    //   console.log(err)
    //   return err;
    // })
    return([{
        id: 1,
        name: "La Liga",
        img: '../../images/leagues/Laliga.png',
      },
      {
        id: 2,
        name: "Liga NOS",
        img: '../../images/leagues/Liga_NOS.png',
      }]
    )
}

// return axios({
//     url: "https://v3.football.api-sports.io/fixtures?live=all",
//     method: 'get',
//     "headers": {
//       "x-rapidapi-host": "v3.football.api-sports.io",
//       "x-rapidapi-key": "YourKey"
//     }
//   }