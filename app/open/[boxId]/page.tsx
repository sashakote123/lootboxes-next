import OpenCase from '@/components/openCase/OpenCase';
import { Suspense } from 'react';

interface Props {
  params: Promise<{
    boxId: string;
  }>;
}

// Компонент-обертка для асинхронной загрузки
async function CaseLoader({ boxId }: { boxId: string }) {
  return <OpenCase boxId={boxId} />;
}

export default async function Page(props: Props) {
  const params = await props.params;
  return (
    <Suspense fallback={<div>Loading case...</div>}>
      <CaseLoader boxId={params.boxId} />
    </Suspense>
  );
}

export const dynamic = 'force-dynamic';