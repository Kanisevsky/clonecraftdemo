'use client';
import axios from 'axios';
import * as z from 'zod';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { Size } from '@prisma/client';
import { Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import Heading from '@/components/ui/Heading';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import AlertModal from '@/components/modals/alert-modal';

const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});

type ColourFormValues = z.infer<typeof formSchema>;

interface ColourFormProps {
  initialData: Size | null;
}

const ColourForm: React.FC<ColourFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit colours' : 'Create colours';
  const description = initialData ? 'Edit a Size' : 'Add a new Colour';
  const toastMessage = initialData ? 'Colour Updated' : 'Colour Created';
  const action = initialData ? 'Save Changes' : 'Create';

  const form = useForm<ColourFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || { name: '', value: '' },
  });

  const onSubmit = async (data: ColourFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/colours/${params.sizeId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/colours`, data);
      }
      router.push(`/${params.storeId}/colours`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error('Something Went Wrong');
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/colours/${params.sizeId}`);
      router.refresh();
      router.push(`/${params.storeId}/colours`);
      toast.success('Colour Deleted');
    } catch (error) {
      toast.error(
        'Make Sure you removed all products using this colour first '
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Colour name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Colour value"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ColourForm;
