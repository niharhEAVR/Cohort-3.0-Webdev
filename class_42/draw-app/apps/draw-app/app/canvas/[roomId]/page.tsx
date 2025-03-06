import { RoomCanvas } from "@/components/RoomCanvas";

export default function Draw({ params }: { params: { roomId: string } }) {
    const roomId = params.roomId;
    console.log(roomId, typeof roomId);
    return <RoomCanvas roomId={roomId} />;
}
