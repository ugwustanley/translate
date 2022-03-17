import translateClient from '../config/axios.config';

import fs from 'fs';

import path from 'path';

const abbrPath = path.join(__dirname, '../data/abbr.json');



const writeAbbr = (data:any) =>{
    return fs.writeFileSync(abbrPath, JSON.stringify(data));
}


const readAbbr = () =>{
    
    const data = fs.readFileSync(abbrPath, 'utf8');

    if(!data) return

    return JSON.parse(data);
    //data.toString();
}

const fetchAPI = async () =>{

    try {

        const response = await translateClient.get(`slangs`);

        return response.data;

    } catch (error) {

        return error;

    }
}



const getTranslation = async (text: string) => {
    
    const dataFromLocal = await readAbbr();

    if(!dataFromLocal) {

        console.log("No data from local")

        let dataFromAPI = await fetchAPI();

        console.log('data from api without initial check')

        dataFromAPI = dataFromAPI.data;

        if(dataFromAPI && dataFromAPI.length > 0){

            writeAbbr(dataFromAPI);

            
            for(let i = 0; i < dataFromAPI.length; i++){

                   
                if(dataFromAPI[i].abbr == text){

                    return dataFromAPI[i].full;
                }
            }


            return;
        }

      
    }else{
        //console.log(dataFromLocal)

        if(dataFromLocal.length > 0){

            for(let i = 0; i < dataFromLocal.length; i++){

                if(dataFromLocal[i].abbr == text){
                    console.log("passed")
                    return dataFromLocal[i].full;
                }

            }

      

            

            console.log("abbr not found in local")

            let dataFromAPI = await fetchAPI();

            console.log( 'data from api after initial check on local')

            dataFromAPI = dataFromAPI.data;
    
            if(dataFromAPI && dataFromAPI.length > 0){
    
                writeAbbr(dataFromAPI);

                for(let i = 0; i < dataFromAPI.length; i++){

                   
                    if(dataFromAPI[i].abbr == text){
    
                        return dataFromAPI[i].full;
                    }
                }
    
               
    
                return;
            }
        }
    }

   
}



export default getTranslation;