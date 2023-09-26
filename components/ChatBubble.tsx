import React, { useEffect } from 'react';

const ChatBubbleComponent: React.FC = () => {
  useEffect(() => {
    // Create the script element
    const script = document.createElement('script');
    script.src = 'https://www.chatbase.co/embed.min.js';
    script.defer = true;
    script.setAttribute('chatbotId', 'cbxhzog4GVocKSVBBrjy6');
    script.setAttribute('domain', 'www.chatbase.co');

    // Append the script to the document's body
    document.body.appendChild(script);

    // Cleanup when the component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // or any other content you want to render
};

export default ChatBubbleComponent;
