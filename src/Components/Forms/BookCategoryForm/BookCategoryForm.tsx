"use client";

import { useMemo } from "react";
import { Button, Group, Paper, Stack, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { IconCheck, IconX } from "@tabler/icons-react";

import { notifications } from "@mantine/notifications";

import { trpc } from "@/utils/trpc";

import { BookCategoryFormSchema, bookCategoryFormSchema } from "./schema";

type Props = {
  close: () => void;
};

const BookCategoryForm = ({ close }: Props) => {
  const utils = trpc.useUtils();
  const schema = useMemo(() => bookCategoryFormSchema, []);

  const form = useForm<BookCategoryFormSchema>({
    validateInputOnChange: true,
    validate: zodResolver(schema),
  });

  const { mutate: mutateCategory, isPending: mutateCategoryIsPending } =
    trpc.category.createCategory.useMutation({
      onSuccess: () => {
        notifications.show({
          id: "category-success",
          withCloseButton: true,
          title: "Success!",
          message: "Category created successfully",
          color: "green",
          icon: <IconCheck />,
          loading: false,
        });

        form.setFieldValue("name", "");
        form.setFieldValue("description", "");

        utils.category.listCategory.invalidate();
        close();
      },
      onError: (error) => {
        console.log(error);

        notifications.show({
          id: "category-failed",
          withCloseButton: true,
          title: "Failed",
          message: "Category created failed",
          color: "red",
          icon: <IconX />,
          loading: false,
        });
      },
    });

  const handleSubmit = async (values: BookCategoryFormSchema) => {
    mutateCategory(values);
  };

  return (
    <Paper
      component="form"
      onSubmit={form.onSubmit((_values) => {
        handleSubmit(_values);
      })}
    >
      <Stack>
        <TextInput
          {...form.getInputProps("name")}
          required
          label="Name"
          placeholder="Enter Name"
        />
        <TextInput
          {...form.getInputProps("description")}
          label="Description"
          placeholder="Enter Description"
        />
      </Stack>
      <Group mt="xl" justify="end">
        <Button
          color="red"
          variant="outline"
          loading={mutateCategoryIsPending}
          onClick={() => close()}
        >
          Cancel
        </Button>
        <Button
          variant="filled-primary"
          type="submit"
          loading={mutateCategoryIsPending}
        >
          Save
        </Button>
      </Group>
    </Paper>
  );
};

export default BookCategoryForm;
