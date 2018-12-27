package ru.aptech.library.entities;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity(name = "book")
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class Book implements Serializable, CommonEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Getter @Setter
	private Long id;

	@Column(name = "name")
	@Getter @Setter
	private String name;

//	@JsonIgnore
//	private Set<BookContent> bookContents = new HashSet<>();

	@Column(name = "page_count")
	@Getter @Setter
	private Integer pageCount;

	@Column(name = "isbn")
	@Getter @Setter
	private String isbn;

	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="genre_id")
	@Getter @Setter
	private Genre genre;

	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="author_id")
	@Getter @Setter
	private Author author;

	@Column(name = "publish_year")
	@Getter @Setter
	private Integer publishYear;

//	@ManyToOne(fetch=FetchType.EAGER)
//	@JoinColumn(name="publisher_id")
//	private Publisher publisher;

	@Column(name = "image")
	@Getter @Setter
	private byte[] image;

	@Column(name = "descr")
	@Getter @Setter
	private String descr;

	@Column(name = "bookcol")
	@Getter @Setter
	private String bookcol;

	@Column(name = "rating")
	@Getter @Setter
	private Integer rating;

	@Column(name = "vote_count")
	@Getter @Setter
	private Long voteCount;

	@Column(name = "created")
	@Getter @Setter
	private LocalDateTime created;

	@Column(name = "views")
	@Getter @Setter
	private Long views;

	@Column(name = "price")
	@Getter @Setter
	private Double price;

//	@JsonIgnore
//	private Set<Cart> carts = new HashSet<>(0);
//	@JsonIgnore
//	private Set<Order> orders = new HashSet<>(0);

	/**
	 * Всегда равно пустой строке если контент не загружен
	 * */
	@Column(name = "file_extension")
	private String fileExtension;

	/**
	 * Всегда равно null если контент не загружен
	 * */
	@Column(name = "content_type")
	private String contentType;

	@Column(name = "file_size")
	private String fileSize;



//	public void setAllField(Book book) throws SQLException {
//		this.name = book.name;
//		if(book.bookContents !=null && !book.bookContents.isEmpty() && book.bookContents.iterator().next().getContent().length()>0){
//			this.bookContents = book.bookContents;
//		}
//		this.pageCount = book.pageCount;
//		this.isbn = book.isbn;
//		this.genre = book.genre;
//		this.author = book.author;
//		this.publishYear = book.publishYear;
//		this.publisher = book.publisher;
//		if(book.image!=null && book.image.length>0){
//			this.image = book.image;
//		}
//		this.descr = book.descr;
//		this.bookcol = book.bookcol;
//		this.rating = book.rating;
//		this.voteCount = book.voteCount;
//		this.price = book.price;
//	}
}
