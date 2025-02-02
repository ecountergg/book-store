import { Modal } from "@mantine/core";

import BookCategoryForm from "@/components/Forms/BookCategoryForm";

type Props = {
  opened: boolean;
  close: () => void;
};

export const BookCategoryFormModal = ({ opened, close }: Props) => {
  return (
    <Modal opened={opened} title="Create Category" onClose={close} centered>
      <BookCategoryForm close={close} />
    </Modal>
  );
};
