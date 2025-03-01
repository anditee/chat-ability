import {signal} from "@preact/signals-react";

const showChat = signal(false);

const showOrHideChat = () => {
    showChat.value = !showChat.value;
};

export {showChat, showOrHideChat};