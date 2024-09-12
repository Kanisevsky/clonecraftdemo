'use client';

import { useOrigin } from '@/hooks/use-origin';
import ApiAlert from './apiAlert';
import { useParams } from 'next/navigation';

interface ApiListProps {
  entityName: string;
  entitiyIdName: string;
}

const ApiList: React.FC<ApiListProps> = ({ entitiyIdName, entityName }) => {
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
      <ApiAlert
        title="GET"
        description={`${baseUrl}/${entityName}/{${entitiyIdName}}`}
        variant="public"
      />
      <ApiAlert
        title="POST"
        description={`${baseUrl}/${entityName}`}
        variant="admin"
      />
      <ApiAlert
        title="PATCH"
        description={`${baseUrl}/${entityName}/{${entitiyIdName}}`}
        variant="admin"
      />
      <ApiAlert
        title="DELETE"
        description={`${baseUrl}/${entityName}/{${entitiyIdName}}`}
        variant="admin"
      />
    </div>
  );
};

export default ApiList;
