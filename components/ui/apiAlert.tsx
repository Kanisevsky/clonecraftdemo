import { Server } from 'lucide-react';
import { Alert } from './alert';

interface ApiAlertProps {
  title: string;
  description: string;
  variant: 'public' | 'admin';
}

const textMap: Record<ApiAlertProps['variant'], string> = {
  public: 'Public',
  admin: 'Admin',
};

const variantMap: Record<ApiAlertProps['variant'], string> = {
  public: 'Secondary',
  admin: 'Destructive',
};

const ApiAlert: React.FC<ApiAlertProps> = ({
  title,
  description,
  variant = 'public',
}) => {
  return (
    <div>
      <Alert>
        <Server className="h-4 w-4" />
      </Alert>
    </div>
  );
};

export default ApiAlert;
