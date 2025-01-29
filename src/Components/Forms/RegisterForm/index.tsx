"use client";

import {
  Anchor,
  Button,
  Divider,
  Group,
  Paper,
  PaperProps,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useRouter } from "next/router";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

import { GoogleButton } from "@/components/Buttons/GoogleButton";
import { trpc } from "@/utils/trpc";

import { RegisterFormSchema, registerFormSchema } from "./schema";
import { useCallback } from "react";

export function RegisterForm(props: PaperProps) {
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: zodResolver(registerFormSchema),
  });
  const router = useRouter();
  const { mutate: registerUser, isPending: registerUserIsPending } =
    trpc.auth.register.useMutation({
      onSuccess: () => {
        notifications.show({
          id: "register-success",
          withCloseButton: true,
          title: "Success!",
          message: "User created successfully",
          color: "green",
          icon: <IconCheck />,
          loading: false,
        });

        form.setFieldValue("email", "");
        form.setFieldValue("name", "");
        form.setFieldValue("password", "");
      },
      onError: () => {
        notifications.show({
          id: "register-failed",
          withCloseButton: true,
          title: "Failed",
          message: "User created failed",
          color: "red",
          icon: <IconX />,
          loading: false,
        });
      },
    });

  const goToLogin = () => {
    router.push("/");
  };

  const onSubmit = useCallback((values: RegisterFormSchema) => {
    registerUser(values);
  }, []);

  return (
    <Paper radius="md" p="xl" w={360} withBorder {...props}>
      <Text size="lg" fw={500}>
        Welcome to Mantine, register with
      </Text>

      <Group grow mb="md" mt="md">
        <GoogleButton radius="xl">Google</GoogleButton>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form
        onSubmit={form.onSubmit((values) => {
          onSubmit(values);
        })}
      >
        <Stack>
          <TextInput
            {...form.getInputProps("name")}
            label="Full Name"
            placeholder="John Doe"
            required
            radius="md"
          />

          <TextInput
            {...form.getInputProps("email")}
            label="Email"
            placeholder="hello@mantine.dev"
            required
            radius="md"
          />

          <PasswordInput
            {...form.getInputProps("password")}
            label="Password"
            placeholder="Your password"
            required
            radius="md"
          />
          <PasswordInput
            {...form.getInputProps("confirmPassword")}
            label="Password"
            placeholder="Confirm Your password"
            required
            radius="md"
          />
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor
            component="button"
            type="button"
            c="dimmed"
            onClick={() => goToLogin()}
            size="xs"
          >
            {"Already have an account? Login"}
          </Anchor>
          <Button type="submit" radius="xl" loading={registerUserIsPending}>
            Register
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
