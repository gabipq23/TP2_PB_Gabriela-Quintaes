import { useState, useEffect} from 'react';
import './accordion.css'
import { FiAward } from "react-icons/fi";
import { FaRankingStar } from "react-icons/fa6";
import { FaBookOpen } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";

export function Accordion(props){


  const [posts, setPosts] = useState(null);


    const baseUrl = 'https://inconsert-pb-13d11-default-rtdb.asia-southeast1.firebasedatabase.app/'

    function convertData(data) {
      const ids = Object.keys(data);
      let posts = Object.values(data);
      return posts.map((post,index) =>{
        return{
          id:ids[index], ...post,
        };
      });
    }

    useEffect(() => {
      fetch(`${baseUrl}/postList.json`)
      .then(async (resp) => {
        const respPosts = await resp.json();
        let convertedPosts = convertData(respPosts);
        setPosts(convertedPosts);
      })
    },[]);

    const [selected, setSelected]  = useState(null);
  
    const toggle = (i) =>{
      if(selected == i){
        return setSelected(null);
      }
      setSelected(i)
    }

    return(
        <div className="flex flex-col">
          <div className="flex flex-col gap-4 p-4">

            <div className="mx-2.5 flex flex-col w-full p-2 rounded-lg shadow-md ">
                <div className="flex gap-2 justify-between items-center text-[#EE5DB6]" onClick={() => toggle(0)}>
                  
                  <div className='flex items-center gap-2'>
                    <FiAward size='20px'  />
                    <p>Prêmios</p>
                    </div>
                    
                    <span>{selected == 0 ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}</span>
                 
                </div>

                <div className={selected == 0 ? 'conteudo show' : 'conteudo'}>
                <div className='flex flex-col p-2 gap-1 border-b-2'>
                  <p>Desconto com a Eventim</p>
                  </div>
                  <div className='flex flex-col p-2 gap-1 border-b-2'>
                  <p>Par de ingressos na Tickets4Fun</p>
                  </div>
                  <div className='flex flex-col p-2 gap-1 border-b-2'>
                  <p>Copo personalizado</p>
                  </div>
                  <div className='flex flex-col p-2 gap-1 border-b-2'>
                  <p>Poster da sua banda preferida</p>
                  </div>
                </div>
          </div>

        </div>

        <div className="accordion flex flex-col gap-4 justify-center p-4">

        <div className="mx-2.5 flex flex-col w-full p-2 rounded-lg shadow-md ">
                <div className="flex gap-2 justify-between items-center text-[#EE5DB6]" onClick={() => toggle(1)}>
                  
                  <div className='flex items-center gap-2'>
                  <FaRankingStar size='20px'  />
                  
                  <p>Ranking</p>
                  
                  </div>
                  <span>{selected == 1 ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}</span>
              
              </div>

              <div className={selected == 1 ? 'conteudo show' : 'conteudo'}>
              <div className='flex flex-col p-2 gap-1' >
                  <p>2º Lugar</p>
                  </div>
                
              </div>
          </div>

        </div>

        <div className="accordion flex flex-col gap-4 justify-center p-4">

        <div className="mx-2.5 flex flex-col w-full p-2 rounded-lg shadow-md ">
                <div className="flex gap-2 justify-between items-center text-[#EE5DB6]" onClick={() => toggle(2)}>
                  
                  <div className='flex items-center gap-2'>
                  <FaBookOpen size='20px'  />
                  <p>Meus Posts</p>
                  </div>
                  <span>{selected == 2 ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}</span>
              
              </div>
             {posts && posts.map((post) => 
              <div key={post.id} className={selected == 2 ? 'conteudo show' : 'conteudo'}>
                <div className='flex flex-col p-2 gap-1 border-b-2'>
                  <p>Artista: {post.artista} </p>
                  <p>{post.titulo}</p>
                </div>
              </div>
             )}
          </div>
        </div>
    </div>
    )
}