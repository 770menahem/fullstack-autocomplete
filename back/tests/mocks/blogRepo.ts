import { IBlogDal } from '../../src/interfaces/DAL/blogDal.interface';
import Blog from '../../src/types/blog.type';

class BlogRepoMock implements IBlogDal {
    private blogs: Blog[] = [
        {
            _id: '1',
            title: 'test blog',
            description: 'test blog description',
            author: 'test author',
        },
    ];

    public create = async (blog: Blog) => {
        this.blogs.push(blog);
        return blog;
    };

    public updateDescription = async (blogId: string, description: string) => {
        const blog = this.blogs.find((b) => b._id === blogId);
        if (blog) {
            blog.description = description;
            return blog;
        }
        return null;
    };

    public delete = async (blogId: string) => {
        const blog = this.blogs.find((b) => b._id === blogId);
        if (blog) {
            this.blogs = this.blogs.filter((b) => b._id !== blogId);
            return blog;
        }
        return null;
    };

    public getById = async (blogId: string) => {
        const blog = this.blogs.find((b) => b._id === blogId);

        return blog || null;
    };

    public getAll = async () => {
        return this.blogs;
    };

    public getByAuthor = async (userName: string) => {
        const blogs = this.blogs.filter((b) => b.author === userName);

        return blogs || null;
    };
}

export default BlogRepoMock;
