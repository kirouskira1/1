import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const loginSchema = z.object({
  email: z.string().email({ message: 'Por favor, insira um e-mail válido.' }),
  password: z.string().min(6, { message: 'Senha deve ter pelo menos 6 caracteres.' }),
});

const registerSchema = z.object({
  name: z.string().min(2, { message: 'Nome deve ter pelo menos 2 caracteres.' }),
  email: z.string().email({ message: 'Por favor, insira um e-mail válido.' }),
  password: z.string().min(6, { message: 'Senha deve ter pelo menos 6 caracteres.' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

const LoginModal = () => {
  const { isLoading, login, register, loginWithGoogle, showAuthModal, setShowAuthModal, initialAuthMode } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>(initialAuthMode);
  const { toast } = useToast();

  // Update mode when initialAuthMode changes
  useEffect(() => {
    setMode(initialAuthMode);
  }, [initialAuthMode]);

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onLoginSubmit = async (data: LoginFormValues) => {
    try {
      await login(data.email, data.password);
      toast({
        title: "Login bem-sucedido!",
        description: "Bem-vindo(a) de volta à Artmatch.",
      });
    } catch (error) {
      toast({
        title: "Erro ao fazer login",
        description: "Verifique suas credenciais e tente novamente.",
        variant: "destructive",
      });
    }
  };

  const onRegisterSubmit = async (data: RegisterFormValues) => {
    try {
      await register(data.email, data.password, data.name);
      toast({
        title: "Cadastro realizado!",
        description: "Sua conta foi criada com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao criar conta",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      toast({
        title: "Login com Google realizado!",
        description: "Bem-vindo(a) à Artmatch.",
      });
    } catch (error) {
      toast({
        title: "Erro ao fazer login com Google",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };

  return (
    <Sheet open={showAuthModal} onOpenChange={setShowAuthModal}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader className="mb-6">
          <SheetTitle>
            {mode === 'login' ? 'Entrar na Artmatch' : 'Criar uma conta'}
          </SheetTitle>
          <SheetDescription>
            {mode === 'login'
              ? 'Entre para interagir com editais e artistas.'
              : 'Junte-se à comunidade Artmatch hoje mesmo!'}
          </SheetDescription>
        </SheetHeader>

        {mode === 'login' ? (
          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="seu@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Entrando...
                  </>
                ) : (
                  'Entrar'
                )}
              </Button>
            </form>
          </Form>
        ) : (
          <Form {...registerForm}>
            <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
              <FormField
                control={registerForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="seu@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Criando conta...
                  </>
                ) : (
                  'Cadastrar'
                )}
              </Button>
            </form>
          </Form>
        )}

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-muted"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">ou continue com</span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-2">
            <Button variant="outline" type="button" onClick={handleGoogleLogin} disabled={isLoading}>
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>
              Google
            </Button>
          </div>
        </div>

        <SheetFooter className="mt-6">
          <div className="flex flex-col items-center justify-center w-full gap-2">
            {mode === 'login' ? (
              <Button variant="link" onClick={() => setMode('register')} className="text-artmatch-purple w-full">
                Não tem uma conta? Cadastre-se
              </Button>
            ) : (
              <Button variant="link" onClick={() => setMode('login')} className="text-artmatch-purple w-full">
                Já tem uma conta? Faça login
              </Button>
            )}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default LoginModal;
