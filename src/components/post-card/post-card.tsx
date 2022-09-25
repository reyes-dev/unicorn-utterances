// TODO: Add click back to `li`
// TODO: Make user-profile-pic clickable again
import cardStyles from "./post-card.module.scss";
import {UserProfilePic} from "../user-profile-pic/user-profile-pic";
import dayjs from "dayjs";
import { PostInfo } from "types/PostInfo";

interface PostCardProps {
	post: PostInfo; // Info on the authors of the post
	class?: string; // class to pass to the post card element
    unicornProfilePicMap: astroHTML.JSX.ImgHTMLAttributes[];
}

export const PostCard = ({ post, class: className = "", unicornProfilePicMap }: PostCardProps) => {
	const { published, slug, title, authorsMeta, tags, description, excerpt } =
		post;

	const publishedStr = dayjs(published).format("MMMM D, YYYY");

	return (
		<li class={`${cardStyles.card} ${className}`} role="listitem">
			<div class={cardStyles.cardContents}>
				<a href={`/posts/${slug}`} class="unlink">
					<h2 class={cardStyles.header}>{title}</h2>
				</a>
				<p class={cardStyles.authorName}>
					<span>by&nbsp;</span>
					<a
						class={cardStyles.authorLink}
						href={`/unicorns/${authorsMeta[0].id}`}
					>
						{authorsMeta[0].name}
					</a>
					{/* To avoid having commas on the first author name, we did this */}
					{authorsMeta.slice(1).map((author, i) => {
						return (
							<>
								<span>, </span>
								<a
									href={`/unicorns/${author.id}`}
									class={cardStyles.authorLink}
								>
									{author.name}
								</a>
							</>
						);
					})}
				</p>
				<div class={cardStyles.dateTagSubheader}>
					<p class={cardStyles.date}>{publishedStr}</p>
					{tags.map((tag) => (
						<span class={cardStyles.tag}>{tag}</span>
					))}
				</div>
				<p class={cardStyles.excerpt} dangerouslySetInnerHTML={{__html: description || excerpt}}></p>
			</div>
			<UserProfilePic
				authors={authorsMeta}
				className={cardStyles.authorImagesContainer}
                unicornProfilePicMap={unicornProfilePicMap}
			/>
		</li>
	);
};
