import { useContext, useEffect,useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

export default function Show(){
    const {id} = useParams();
    const navigate = useNavigate();

    const {user, token} = useContext(AppContext);
    const [posts, setPosts] = useState(null);
   
    async function getPost(){
        const res = await fetch(`/api/posts/${id}`);
        const data = await res.json();

       if(res.ok){
            setPosts(data.post);
          
       }
    }

    async function handleDelete(e){

        if(user && user.id === posts.user_id ){
            const res = await fetch(`/api/posts/${id}`, {  
                method: 'delete',  
                headers:{
                    Authorization: `Bearer ${token}`
                },
           });
           const data = await res.json();
           
           if(res.ok){
            navigate("/");
           }
        }
       

    }

    useEffect(() => {
        getPost();
    }, []);


    return (
        <>
            {posts ? (
             <div key={posts.id} className="mt-4 p-4 border rounded-md border-dashed border-x-slate-400">
                <div className="mb-2 flex items-start justify-between">
                    <div>
                        <h2 className="font-bold text-2xl">{posts.title}</h2>
                        <small className="text-xs text-slate-600">
                            Create by {posts.user.name} on {" "}
                            {new Date(posts.created_at).toLocaleTimeString()}
                        </small>
                    </div>
                    
                </div>
                <p>{posts.body}</p>
                {user && user.id === posts.user_id &&  <div className="flex items-center justify-end gap-4">
                    <Link 
                        to = {`/posts/update/${posts.id}`}
                        className="bg-green-500 text-white text-sm rounded-lg px-3 py-1"
                    >Update</Link>

                    <form onSubmit={handleDelete}>
                        <button className="bg-red-500 text-white text-sm rounded-lg px-3 py-1">Delete</button>
                    </form>
                </div>}
            </div>
        ) : (
            <p className="title">Page not found! </p> 
        )}

        </>
    );

}