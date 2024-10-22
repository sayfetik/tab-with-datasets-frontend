import React, { useEffect, useState } from 'react';
import './LikeDislike.css';
import { Icon } from '@iconify-icon/react';
import { Report, BackendConnector } from '../';

const LikeDislike = ({ dataset_id, previousReaction, likes_amount, dislikes_amount }) => {
    const iconSize = "32";
    const [reaction, setReaction] = useState(previousReaction);
    const [showReactionWarning, setReactionWarning] = useState(false);
    const [isReportOpen, setisReportOpen] = useState(false);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    
    useEffect(() => {
        setLikes(likes_amount);
        setDislikes(dislikes_amount);
    }, [likes_amount, dislikes_amount]);

    useEffect(() => {
        setReaction(previousReaction);
    }, [previousReaction]);

    function handle_react(currentReaction) {
        if (reaction === 'not_allowed') return;

        if (reaction === currentReaction) {
            // Удаляем реакцию
            setReaction('');
            if (currentReaction === 'liked') {
                setLikes(prevLikes => prevLikes - 1);
                BackendConnector.remove_rating(dataset_id);
            } else {
                setDislikes(prevDislikes => prevDislikes - 1);
                BackendConnector.remove_rating(dataset_id);
            }
        } else {
            // Устанавливаем новую реакцию
            setReaction(currentReaction);
            if (currentReaction === 'liked') {
                setLikes(prevLikes => prevLikes + 1);
                if (reaction === 'disliked') {
                    setDislikes(prevDislikes => prevDislikes - 1);
                }
                BackendConnector.like(dataset_id);
            } else {
                setDislikes(prevDislikes => prevDislikes + 1);
                if (reaction === 'liked') {
                    setLikes(prevLikes => prevLikes - 1);
                }
                BackendConnector.dislike(dataset_id);
            }
        }
    }

    return (
        <div className='likeDislike' onMouseEnter={() => setReactionWarning(true)} onMouseLeave={() => setReactionWarning(false)}>
            <div className={(reaction === 'not_allowed' && 'not_allowed') || (reaction === 'liked' ? 'clickedLike' : 'like')}>
                <Icon
                    className='likeIcon'
                    onClick={() => handle_react('liked')}
                    icon="iconamoon:like"
                    width={iconSize}
                    height={iconSize}
                />
                <p className='num_of_likes'>{likes}</p>
            </div>
            <div className={(reaction === 'not_allowed' && 'not_allowed') || (reaction === 'disliked' ? 'clickedDisLike' : 'dislike')}>
                <Icon
                    className='dislikeIcon'
                    onClick={() => handle_react('disliked')}
                    icon="iconamoon:dislike"
                    width={iconSize}
                    height={iconSize}
                />
                <p className='num_of_likes'>{dislikes}</p>
            </div>
            {/*<button id='reportButton' onClick={() => setisReportOpen(true)}>Пожаловаться</button>
            <Report isOpen={isReportOpen} onClose={() => setisReportOpen(false)}/>*/}
            {reaction === 'not_allowed' && showReactionWarning && (
                <div id='toolTipReactionWarning'>
                    <p style={{ color: '#0071CE', fontWeight: '500' }}>Оценить датасет можно только после скачивания!</p>
                </div>
            )}
        </div>
    );
};

export default LikeDislike;
