import Slideshow from "@/components/Slideshow";



export default function Home() {
  return (

    <div className="home-container">

      <div className="app-container">
        <Slideshow />
        <div className="button-container">
          <button className="">Create Room</button>
          <button>Join Room</button>
        </div>
      </div>
    </div>
    );
}
