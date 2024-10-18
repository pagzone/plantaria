import { PropsWithChildren, useEffect } from "react";
import { Button, ButtonProps } from "./ui/button";
import { FormState } from "react-hook-form";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SubmitButtonProps extends ButtonProps {
	className?: string;
	formState: FormState<any>;
}

const SubmitButton = ({
	children,
	formState,
	className,
	...props
}: PropsWithChildren<SubmitButtonProps>) => {
	const { isSubmitting } = formState;

	return (
		<Button
			type="submit"
			className={cn("relative", className)}
			disabled={isSubmitting}
			{...props}
		>
			{children}
			{isSubmitting && (
				<div className="absolute inset-0 flex items-center justify-center size-full bg-white/50">
					<LoaderCircle className="animate-spin text-lima-900" />
				</div>
			)}
		</Button>
	);
};

export default SubmitButton;
