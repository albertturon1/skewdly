import { useState } from "react";
import { DialogTrigger } from "@/components/ui/dialog";
import { DialogTitle } from "@/components/ui/dialog";
import { DialogDescription } from "@/components/ui/dialog";
import { DialogHeader } from "@/components/ui/dialog";
import { DialogContent } from "@/components/ui/dialog";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CircleX, Copy, Loader2 } from "lucide-react";
import { Check } from "lucide-react";
import { toast } from "sonner";

export function SessionShareDialog() {
	// const [sessionId, setSessionId] = useState<string | null>(null);
	const [copied, setCopied] = useState(false);

	const [state, setState] = useState<"idle" | "loading" | "error" | "success">(
		"idle",
	);

	const handleShare = async () => {
		if (state === "loading") {
			return;
		}
		try {
			setState("loading");
			// const id = await createSession();
			// setSessionId(id);
			setState("success");
		} catch (_err) {
			setState("error");
		}
	};

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(sessionLink);
			setCopied(true);
			setTimeout(() => setCopied(false), 5000);
		} catch (_err) {
			toast.error("Failed to copy text. Please try again.");
		}
	};

	// const sessionLink = sessionId
	// 	? `${window.location.origin}?session=${sessionId}`
	// 	: "";
	const sessionLink = "session link";

	return (
		<Dialog>
			<DialogTrigger asChild={true}>
				<button
					type="button"
					onClick={handleShare}
					className="flex flex-1 items-center text-sm justify-center rounded-lg hover:bg-blue-600 px-2 py-2 bg-blue-500 text-white"
				>
					Share
				</button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Share session</DialogTitle>
					<DialogDescription>
						{state !== "error"
							? "Anyone with this link will be able to view this session."
							: "Something went wrong while creating the session."}
					</DialogDescription>
				</DialogHeader>
				{state === "loading" ? (
					<div className="flex items-center justify-center h-full">
						<Loader2 className="h-4 w-4 animate-spin" />
					</div>
				) : state === "error" ? (
					<div className="mt-4 rounded-lg border border-destructive/30 bg-destructive/5 p-4 shadow-sm">
						<div className="flex items-start gap-3">
							<CircleX color="red" />
							<div className="flex-1">
								<p className="text-sm font-medium text-destructive">
									{"Failed to create session"}
								</p>
								<p className="mt-1 text-xs text-muted-foreground">
									There was a problem with your request.
								</p>
							</div>
							<Button
								variant="secondary"
								size="sm"
								className="h-8 hover:bg-destructive/10 hover:text-destructive"
								onClick={handleShare}
							>
								Try Again
							</Button>
						</div>
					</div>
				) : (
					<>
						<div className="flex items-center space-x-2 mt-4">
							<div className="grid flex-1 gap-2">
								<Input value={sessionLink} readOnly={true} className="w-full" />
							</div>
							<Button
								size="icon"
								variant="outline"
								className="px-3"
								onClick={copyToClipboard}
							>
								{copied ? (
									<Check className="h-4 w-4" />
								) : (
									<Copy className="h-4 w-4" />
								)}
								<span className="sr-only">Copy link</span>
							</Button>
						</div>
						<div className="flex justify-end gap-2 mt-4">
							<Button
								variant="secondary"
								onClick={() => window.open(sessionLink, "_blank")}
							>
								Open Link
							</Button>
							<DialogTrigger asChild={true}>
								<Button variant="default">Done</Button>
							</DialogTrigger>
						</div>
					</>
				)}
			</DialogContent>
		</Dialog>
	);
}
