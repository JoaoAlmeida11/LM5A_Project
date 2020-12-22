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
        name: "Maria Antonia"
      },
      {
        id: 2,
        nome: "Josefa Maria",
        username: "josm",
        gn: "f",
        tlf: "3519394458"
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