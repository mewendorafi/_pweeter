export default function CustomButton({
	title,
	style,
	handler,
	children,
	isDisabled,
}) {
	return (
		<button onClick={handler} className={style} disabled={isDisabled}>
			{children ? children : title}
		</button>
	);
}
