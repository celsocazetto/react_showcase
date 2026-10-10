import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { XIcon } from "lucide-react"
import { Toast as ToastPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"

const ToastProvider = ToastPrimitive.Provider

function ToastViewport({ className, ...props }: React.ComponentProps<typeof ToastPrimitive.Viewport>) {
  return (
    <ToastPrimitive.Viewport
      className={cn("fixed right-0 bottom-0 z-[100] flex max-h-screen w-full flex-col gap-2 p-4 sm:max-w-sm", className)}
      {...props}
    />
  )
}

const toastVariants = cva(
  "relative flex w-full items-start justify-between gap-3 rounded-lg border p-4 pr-8 shadow-lg data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom-4",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "border-destructive bg-destructive text-white",
      },
    },
    defaultVariants: { variant: "default" },
  },
)

function Toast({ className, variant, ...props }: React.ComponentProps<typeof ToastPrimitive.Root> & VariantProps<typeof toastVariants>) {
  return <ToastPrimitive.Root data-slot="toast" className={cn(toastVariants({ variant }), className)} {...props} />
}

function ToastTitle({ className, ...props }: React.ComponentProps<typeof ToastPrimitive.Title>) {
  return <ToastPrimitive.Title className={cn("text-sm font-semibold", className)} {...props} />
}

function ToastDescription({ className, ...props }: React.ComponentProps<typeof ToastPrimitive.Description>) {
  return <ToastPrimitive.Description className={cn("text-sm opacity-90", className)} {...props} />
}

function ToastClose({ className, ...props }: React.ComponentProps<typeof ToastPrimitive.Close>) {
  return (
    <ToastPrimitive.Close className={cn("absolute top-2 right-2 rounded-xs opacity-70 hover:opacity-100", className)} {...props}>
      <XIcon className="size-4" />
      <span className="sr-only">Fechar</span>
    </ToastPrimitive.Close>
  )
}

export { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose }
