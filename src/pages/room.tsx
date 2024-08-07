import { useParams } from "react-router-dom";

export function Room() {
  const { roomId } = useParams();

  console.log(roomId);
  return (
    <div>
      <h1>Room: {roomId}</h1>
    </div>
  );
}
