import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useAuth } from '@/hooks/use-auth';
import { AuthForm } from './AuthForm';
import { useToast } from '@/hooks/use-toast';

export function AuthDialog() {
  const { isOpen, type, closeAuth } = useAuth();
  const { toast } = useToast();

  const handleSuccess = () => {
    toast({
      title: type === 'signin' ? 'Signed in successfully' : 'Account created successfully',
      description: type === 'signup' ? 'Please check your email to verify your account.' : undefined,
    });
    closeAuth();
  };

  const handleError = (error: Error) => {
    toast({
      title: 'Error',
      description: error.message,
      variant: 'destructive',
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeAuth}>
      <DialogContent className="sm:max-w-[425px] glass-effect">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold gradient-text">
            {type === 'signin' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-sm text-gray-500">
            {type === 'signin'
              ? 'Enter your credentials to sign in'
              : 'Enter your details to get started'}
          </p>
        </div>
        <AuthForm
          type={type}
          onSuccess={handleSuccess}
          onError={handleError}
        />
      </DialogContent>
    </Dialog>
  );
}