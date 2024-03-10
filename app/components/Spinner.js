import Image from "next/image"
import SpinnerButtonImage from "@/public/spinner-button.svg";
export default function Spinner({height, width}) {
  return (
    <div style={{
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center'
    }}>
        <Image src={SpinnerButtonImage} alt="loading..." height={height} width={width} />
    </div>
  )
}
