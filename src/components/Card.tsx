// style the card for the tweet images 
import Image from "next/image"
import { StaticImageData } from "next/image"

interface Props {
    imgPath: StaticImageData
}

const Card = ({ imgPath }: Props) => {

    return (
        <div className="w-full p-4">
          <Image
            src={imgPath.src}
            alt="Slide"
            className="w-full h-auto rounded-lg shadow-lg"
            width={400}
            height={400}
          />
        </div>
      );

}

export default Card