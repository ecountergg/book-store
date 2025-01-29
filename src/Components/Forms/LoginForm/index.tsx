"use client";

import { useState } from "react";
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
import { signIn } from "next-auth/react";

import { GoogleButton } from "@/components/Buttons/GoogleButton";

import { LoginFormSchema, loginFormSchema } from "./schema";
import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";

export function LoginForm(props: PaperProps) {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(loginFormSchema),
  });
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const goToRegister = () => {
    router.push("/register");
  };

  const onSubmit = async (
    values: LoginFormSchema,
    e?: React.FormEvent<HTMLFormElement>
  ) => {
    e?.preventDefault();
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (result?.error) {
      setLoading(false);

      notifications.show({
        id: "login-failed",
        withCloseButton: true,
        title: "Failed",
        message: "Invalid credentials",
        color: "red",
        icon: <IconX />,
        loading: false,
      });
    } else {
      router.push("/admin");
    }
  };

  return (
    <Paper radius="md" p="xl" w={360} withBorder {...props}>
      <Text size="lg" fw={500}>
        Welcome to Mantine, login with
      </Text>

      <Group grow mb="md" mt="md">
        <GoogleButton radius="xl">Google</GoogleButton>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form
        onSubmit={form.onSubmit((values, e) => {
          onSubmit(values, e);
        })}
      >
        <Stack>
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
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor
            component="button"
            type="button"
            c="dimmed"
            onClick={() => goToRegister()}
            size="xs"
          >
            {"Don't have an account? Register"}
          </Anchor>
          <Button type="submit" radius="xl" loading={isLoading}>
            Login
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
