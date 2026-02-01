import { useState } from "react";
import "./ShareButtons.css";

function ShareButtons({ caseTitle, caseId }) {
    const [showMenu, setShowMenu] = useState(false);
    
    const shareUrl = `${window.location.origin}/case/${caseId}`;
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(caseTitle);

    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        email: `mailto:?subject=${encodedTitle}&body=Check out this case: ${shareUrl}`,
    };

    const handleShare = (platform) => {
        if (platform === "copy") {
            navigator.clipboard.writeText(shareUrl);
            setShowMenu(false);
            // Optional: Show toast notification
            alert("Link copied to clipboard!");
        } else {
            window.open(shareLinks[platform], "_blank", "width=600,height=400");
            setShowMenu(false);
        }
    };

    return (
        <div className="share-buttons-container">
            <button 
                className="share-toggle"
                onClick={() => setShowMenu(!showMenu)}
                aria-label="Share case"
            >
                Share
            </button>
            
            {showMenu && (
                <div className="share-menu">
                    <button 
                        className="share-option facebook"
                        onClick={() => handleShare("facebook")}
                    >
                        Facebook
                    </button>
                    <button 
                        className="share-option twitter"
                        onClick={() => handleShare("twitter")}
                    >
                        Twitter/X
                    </button>
                    <button 
                        className="share-option linkedin"
                        onClick={() => handleShare("linkedin")}
                    >
                        LinkedIn
                    </button>
                    <button 
                        className="share-option email"
                        onClick={() => handleShare("email")}
                    >
                        Email
                    </button>
                    <button 
                        className="share-option copy"
                        onClick={() => handleShare("copy")}
                    >
                        Copy Link
                    </button>
                </div>
            )}
        </div>
    );
}

export default ShareButtons;
