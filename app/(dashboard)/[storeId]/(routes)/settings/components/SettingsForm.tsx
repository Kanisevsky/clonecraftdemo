'use client';

import { Store } from '@prisma/client';

interface SettingsFormProps {
  initialData: Store;
}

const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
  return (
    <div className="flex items-center justify-between">
      <Heading title="Settings" description="Manage store preferences" />
      Settings Form
    </div>
  );
};

export default SettingsForm;
