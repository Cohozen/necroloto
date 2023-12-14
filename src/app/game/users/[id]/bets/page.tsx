export default function Page({ params }: { params: { id: string } }) {
    return <div>Bet from user: {params.id}</div>;
}