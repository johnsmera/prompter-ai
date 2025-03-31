export const ChatMessage = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return (
		<div
			className={`bg-gray-700 p-4 rounded-lg max-w-md shadow-sm ${className}`}
		>
			{children}
		</div>
	);
};
