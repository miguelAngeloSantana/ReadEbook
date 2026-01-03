export default function Menu() {
    return (
        <div 
            className=" flex items-center justify-between"
            style={{padding: "0 1rem"}}
        >
            <h1 className="text-amber-50">ReadFree</h1>

            <div 
                className="flex md:flex-row flex-col justify-between"
                style={{marginTop: "15px", gap: "2rem"}}    
            >
                
                    <button 
                        className="bg-blue-200 rounded-3xl text text-[#121212] font-bold cursor-pointer"
                        style={{padding: "0.8rem"}}
                    >
                        Login/Registro
                    </button>

        
                    <button 
                        className="bg-blue-200 rounded-3xl text-[#121212] font-bold cursor-pointer"
                        style={{padding: "0.8rem"}}
                    >
                        Favoritos
                    </button>
                
            </div>
        </div>
    )
}