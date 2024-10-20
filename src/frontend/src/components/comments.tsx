import { useState } from "react";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { commentFormSchema, CommentFormSchema, ReplyFormSchema, replyFormSchema } from "@/lib/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ScrollArea } from "./ui/scroll-area";

interface Reply {
    id: number;
    username: string;
    profileImage: string;
    text: string;
}

interface Comment {
    id: number;
    username: string;
    profileImage: string;
    text: string;
    replies: Reply[];
}

const CommentArea = () => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [replyToCommentId, setReplyToCommentId] = useState<number | null>(null);
    const [editCommentId, setEditCommentId] = useState<number | null>(null);
    const [editReplyId, setEditReplyId] = useState<number | null>(null);

    const commentForm = useForm<z.infer<typeof commentFormSchema>>({
        resolver: zodResolver(commentFormSchema),
        defaultValues: {
            newComment: "",
        },
    });

    const replyForm = useForm<z.infer<typeof replyFormSchema>>({
        resolver: zodResolver(replyFormSchema),
        defaultValues: {
            newReply: "",
        },
    });

    const onCommentSubmit = (values: z.infer<CommentFormSchema>) => {
        const newComment: Comment = {
            id: Date.now(),
            username: "Your Name",
            profileImage: "/path/to/your-profile.jpg",
            text: values.newComment,
            replies: [],
        };
        setComments((prev) => [...prev, newComment]);
        commentForm.reset();
    };

    const onReplySubmit = (values: z.infer<ReplyFormSchema>) => {
        if (replyToCommentId) {
            const newReply: Reply = {
                id: Date.now(),
                username: "Your Name",
                profileImage: "/path/to/your-profile.jpg",
                text: values.newReply,
            };

            const updatedComments = comments.map((comment) => {
                if (comment.id === replyToCommentId) {
                    return { ...comment, replies: [...comment.replies, newReply] };
                }
                return comment;
            });

            setComments(updatedComments);
            replyForm.reset();
            setReplyToCommentId(null);
        }
    };

    const editComment = (commentId: number, newText: string) => {
        const updatedComments = comments.map((comment) => {
            if (comment.id === commentId) {
                return { ...comment, text: newText };
            }
            return comment;
        });
        setComments(updatedComments);
        setEditCommentId(null);
    };

    const editReply = (commentId: number, replyId: number, newText: string) => {
        const updatedComments = comments.map((comment) => {
            if (comment.id === commentId) {
                const updatedReplies = comment.replies.map((reply) => {
                    if (reply.id === replyId) {
                        return { ...reply, text: newText };
                    }
                    return reply;
                });
                return { ...comment, replies: updatedReplies };
            }
            return comment;
        });
        setComments(updatedComments);
        setEditReplyId(null);
    };

    const deleteComment = (commentId: number) => {
        const updatedComments = comments.filter(comment => comment.id !== commentId);
        setComments(updatedComments);
    };

    const deleteReply = (commentId: number, replyId: number) => {
        const updatedComments = comments.map((comment) => {
            if (comment.id === commentId) {
                const updatedReplies = comment.replies.filter(reply => reply.id !== replyId);
                return { ...comment, replies: updatedReplies };
            }
            return comment;
        });
        setComments(updatedComments);
    };

    return (
        <div className="flex flex-col gap-y-4 mb-6 border-b px-4 py-4">
            <Form {...commentForm}>
                <form onSubmit={commentForm.handleSubmit(onCommentSubmit)}>
                    <FormField
                        control={commentForm.control}
                        name="newComment"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="Make a comment..."
                                        {...field}
                                        className="w-full p-3 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Submit
                    </Button>
                </form>
            </Form>

            <ScrollArea className="h-48">
                {comments.length > 0 && comments.map((comment) => (
                    <div
                        key={comment.id}
                        className="p-4 bg-white border rounded-md shadow-sm mb-4">
                        <div className="flex items-center mb-2">
                            <img
                                src={comment.profileImage}
                                alt={`${comment.username} profile`}
                                className="w-10 h-10 rounded-full mr-2"
                            />
                            <span className="font-semibold text-lg">{comment.username}</span>
                        </div>

                        {editCommentId === comment.id ? (
                            <div>
                                <Input
                                    type="text"
                                    defaultValue={comment.text}
                                    onChange={(e) => commentForm.setValue("newComment", e.target.value)}
                                    placeholder="Edit your comment..."
                                    className="p-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                                <Button
                                    onClick={() => editComment(comment.id, commentForm.getValues("newComment"))}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                                >
                                    Save
                                </Button>
                                <Button
                                    onClick={() => setEditCommentId(null)}
                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md ml-2 hover:bg-gray-400 transition"
                                >
                                    Cancel
                                </Button>
                            </div>
                        ) : (
                            <div className="mb-2 flex flex-col ">
                                <p className="text-gray-700 border-b py-1.5">{comment.text}</p>
                                <div className="flex justify-start mt-1">
                                    <button onClick={() => setEditCommentId(comment.id)} className="text-sm ml-2 underline cursor-pointer text-blue-600 hover:text-blue-800">
                                        Edit
                                    </button>
                                    <button onClick={() => deleteComment(comment.id)} className="text-sm ml-2 underline cursor-pointer text-red-600 hover:text-red-800">
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => setReplyToCommentId(comment.id)}
                                        className="text-sm ml-2 underline cursor-pointer text-blue-600 hover:text-blue-800"
                                    >
                                        Reply
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Display Replies */}
                        {comment.replies.length > 0 && (
                            <div className="ml-6 mt-2">
                                {comment.replies.map((reply) => (
                                    <div key={reply.id} className="flex items-center mb-1 border-b py-2">
                                        <img
                                            src={reply.profileImage}
                                            alt={`${reply.username} profile`}
                                            className="w-8 h-8 rounded-full mr-2"
                                        />
                                        {editReplyId === reply.id ? (
                                            <div className="flex items-center">
                                                <Input
                                                    type="text"
                                                    defaultValue={reply.text}
                                                    onChange={(e) => replyForm.setValue("newReply", e.target.value)}
                                                    placeholder="Edit your reply..."
                                                    className="p-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                />
                                                <Button
                                                    onClick={() => editReply(comment.id, reply.id, replyForm.getValues("newReply"))}
                                                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                                                >
                                                    Save
                                                </Button>
                                                <Button
                                                    onClick={() => setEditReplyId(null)}
                                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md ml-2 hover:bg-gray-400 transition"
                                                >
                                                    Cancel
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="text-sm text-gray-600">
                                                <span className="font-semibold">{reply.username}: </span>
                                                {reply.text}
                                                <div className="flex">
                                                    <button
                                                        onClick={() => setEditReplyId(reply.id)}
                                                        className="text-sm ml-2 underline cursor-pointer text-blue-600 hover:text-blue-800"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => deleteReply(comment.id, reply.id)}
                                                        className="text-sm ml-2 underline cursor-pointer text-red-600 hover:text-red-800"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Reply Form */}
                        {replyToCommentId === comment.id && (
                            <Form {...replyForm}>
                                <form onSubmit={replyForm.handleSubmit(onReplySubmit)}>
                                    <FormField
                                        control={replyForm.control}
                                        name="newReply"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Make a reply..."
                                                        {...field}
                                                        className="w-full p-3 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex">
                                        <Button
                                            type="submit"
                                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                                        >
                                            Reply
                                        </Button>
                                        <Button
                                            type="button" // Prevents form submission
                                            onClick={() => setReplyToCommentId(null)} // Closes the reply input
                                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md ml-2 hover:bg-gray-400 transition"
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        )}
                    </div>
                ))}
            </ScrollArea>
        </div>
    );
};

export default CommentArea;
