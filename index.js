import axios from 'axios'
import fs from 'fs'
import cron from 'node-cron'

const CURBSIDE = () => {
  return axios.get('https://www.heb.com/commerce-api/v1/timeslot/timeslots?store_id=92&days=15&fulfillment_type=pickup')  
}


cron.schedule('* * * * *', () => {
    console.log('running every minute');
    CURBSIDE()
        .then((res) => {
            // console.log(res.data)
            fs.readFile('./output.json', 'utf8', (err, data) => {
                if (err) throw err;
                const oldData = JSON.parse(data)
                let newObj;
                // if there does not exist items in the new data
                // then save the old ones
                const lengthFound = {'found': true}
                console.log('what is data', res.data)
                if(res.data.items.length) {
                    fs.writeFile('./length.json', JSON.stringify(lengthFound), err => {
                        if (err) {
                        console.error(err)
                        return
                        }
                        //file written successfully
                    })
                }
                if(oldData.items.length > 0 && !data.items.length) {
                    const tempItems = oldData.items
                    newObj =  {...oldData, ...res.data, items: tempItems}
                } else {
                    newObj =  {...oldData, ...res.data}
                }
                fs.writeFile('./output.json', JSON.stringify(newObj), err => {
                    if (err) {
                    console.error(err)
                    return
                    }
                    //file written successfully
                })
            });
            
        })
        .catch((err) =>{
            console.log(err)
        })
    });
// CURBSIDE()
//     .then((res) => {
//         // console.log(res.data)
//         fs.readFile('./output.json', 'utf8', (err, data) => {
//             if (err) throw err;
//             const oldData = JSON.parse(data)
//             let newObj;
//             // if there does not exist items in the new data
//             // then save the old ones
//             if(oldData.items.length > 0 && !data.items.length) {
//                 const tempItems = oldData.items
//                 newObj =  {...oldData, ...res.data, items: tempItems}
//             } else {
//                 newObj =  {...oldData, ...res.data}
//             }
//             fs.writeFile('./output.json', JSON.stringify(newObj), err => {
//                 if (err) {
//                   console.error(err)
//                   return
//                 }
//                 //file written successfully
//               })
//         });
        
//     })
//     .catch((err) =>{
//         console.log(err)
//     })