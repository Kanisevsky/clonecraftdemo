'use client';

import { useOrigin } from '@/hooks/use-origin';
import { useParams } from 'next/navigation';
import ApiAlert from './apiAlert';

interface ApiListProps {
  entityName: string;
  entitiyIdName: string;
}

const apiList: React.FC<ApiListProps> = ({ entitiyIdName, entityName }) => {
  const params = useParams();
  const origin = useOrigin();
  const baseUrl = `${origin}/api/${params.storeId}`;
  return (
    <div>
      <ApiAlert
        title="GET"
        description={`${baseUrl}/${entityName}`}
        variant="public"
      />
    </div>
  );
};

export default apiList;
