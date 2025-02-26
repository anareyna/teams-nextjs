import { Button } from "../ui/button";

type QuestionControlsProps = {
	className?: string;
	numberOfQuestions: number;
	onIncrease: () => void;
	onDecrease: () => void;
};

export default function QuestionControls({
	className,
	numberOfQuestions,
	onIncrease,
	onDecrease,
}: QuestionControlsProps) {
	return (
		<div className={className}>
			<div className="flex gap-4 items-center text-lg">
				Display
				<Button onClick={onDecrease} disabled={numberOfQuestions === 1}>
					-
				</Button>
				{numberOfQuestions}
				<Button onClick={onIncrease}>+</Button>
				{numberOfQuestions > 1 ? "questions:" : "question:"}
			</div>
		</div>
	);
}
