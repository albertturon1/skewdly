interface HistoryState {
	stack: ImageData[];
	index: number;
}

const INITIAL_HISTORY_STATE: HistoryState = { stack: [], index: -1 };

type HistoryAction =
	| { type: "PUSH"; payload: ImageData }
	| { type: "UNDO" }
	| { type: "REDO" }
	| { type: "CLEAR" };

function historyReducer(
	state: HistoryState,
	action: HistoryAction,
): HistoryState {
	switch (action.type) {
		case "PUSH": {
			const { stack, index } = state;
			const newStack = stack.slice(0, index + 1);
			newStack.push(action.payload);
			return { stack: newStack, index: newStack.length - 1 };
		}
		case "UNDO": {
			if (state.index <= 0) {
				return state; // Cannot undo
			}
			return { ...state, index: state.index - 1 };
		}
		case "REDO": {
			if (state.index >= state.stack.length - 1) {
				return state; // Cannot redo
			}
			return { ...state, index: state.index + 1 };
		}
		case "CLEAR": {
			const { stack } = state;
			return { stack: stack.slice(0, 1), index: 0 };
		}
		default: {
			throw new Error(`Unhandled action type: ${action}`);
		}
	}
}

export {
	type HistoryState,
	type HistoryAction,
	INITIAL_HISTORY_STATE,
	historyReducer,
};
