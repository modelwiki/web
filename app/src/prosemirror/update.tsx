import {Plugin} from 'prosemirror-state';

export default function modelUpdatePlugin(callback: (richText: any) => void): Plugin {
	return new Plugin({
		view() {
			return {
				update (updatedView) {
					const json = updatedView.state.toJSON();
					callback(json);
				}
			}
		}
	});
};
