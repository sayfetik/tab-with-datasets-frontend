import React, { useState } from 'react';
import './LikeDislike.css';
import { Icon } from '@iconify-icon/react';
import { Report } from '../';

const LikeDislike = () => {
    const iconSize = "32";
    const [reaction, setReaction] = useState('');
    const [isReportOpen, setisReportOpen] = useState(false);

    function handle_react(currentReaction) {
        if (reaction === currentReaction) {
            setReaction('');
            return;
        }
        setReaction(currentReaction);
    }

    return (
        <div className='likeDislike'>
            <div className={reaction === 'liked' ? 'clicked' : 'like'}>
                <Icon
                    className='likeIcon'
                    onClick={() => handle_react('liked')}
                    icon="iconamoon:like"
                    width={iconSize}
                    height={iconSize}
                />
                <p className='num_of_likes'>10</p>
            </div>
            <div className={reaction === 'disliked' ? 'clicked' : 'dislike'}>
                <Icon
                    className='dislikeIcon'
                    onClick={() => handle_react('disliked')}
                    icon="iconamoon:dislike"
                    width={iconSize}
                    height={iconSize}
                />
                <p className='num_of_likes'>10</p>
            </div>
            <button id='reportButton' onClick={() => setisReportOpen(true)}>Пожаловаться</button>
            <Report isOpen={isReportOpen} onClose={() => setisReportOpen(false)}/>
        </div>
    );
};

export default LikeDislike;
