import OpenCase from '@/components/openCase/OpenCase';

interface Props {
  params: {
    boxId: string;
  };
}

const page = ({ params }: Props) => {
    return (
        <OpenCase boxId={params.boxId}/>
    );
}
export default page;