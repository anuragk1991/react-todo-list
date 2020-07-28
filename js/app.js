// You can do this.
var TodoList = React.createClass({
	getInitialState: function(){
		return {
			data:[]
		};
	},
	componentDidMount: function(){
		this.setState({data: this.props.data});
	},
	handleItemAdded: function(item){
		var items;

		item.id = Date.now();
		items = this.state.data.concat([item])

		localStorage.setItem('todo', JSON.stringify(items))
		this.setState({data: items})

		console.log('added item in storage')
	},
	handleItemRemoved(item){
		var newItems = this.state.data.filter(function(i){
			return item.id != i.id
		})

		localStorage.setItem('todo', JSON.stringify(newItems))
		this.setState({data: newItems})
	},
	render: function(){
		
		return (
			<div className="todo-list">
				{
					this.state.data.length ?
					<TodoListItems data={this.state.data} onItemRemoved={this.handleItemRemoved}/> :
					<p>No Items</p>
				}
				<TodoListInput onItemAdded={this.handleItemAdded} />
			</div>

		);
	}

});

var TodoListItems = React.createClass({
	render: function () {
		var this_ = this;
		var items = this.props.data.map(function (item) {
			return (
				<TodoListItem item={item} key={item.id} onItemRemoved={this_.props.onItemRemoved} />
			);
		});

		return (
			<ul className="todo-list__items">{items}</ul>
		);
	}
});

var TodoListItem = React.createClass({
	onClick: function () {
		this.props.onItemRemoved(this.props.item);
	},
	render: function () {
		return (
			<li className="todo-list__item">
				{this.props.item.name} - <a href="#" onClick={this.onClick}>Remove</a>
			</li>
		);
	}
});

var TodoListInput = React.createClass({
	getInitialState: function () {
		return {
			item: ''
		};
	},
	handleItemAdded: function(e){
		e.preventDefault();

		if(this.state.item.trim() == ''){
			return;
		}

		this.props.onItemAdded({name: this.state.item.trim()});
		this.setState({item: ''})
	},
	handleItemChange(e){
		this.setState({item: e.target.value});
	},
	render: function(){
		return (
			<form onSubmit={this.handleItemAdded}>
				<textarea className="todo-list__input" value={this.state.item} onChange={this.handleItemChange} placeholder="Add an item" rows="5"></textarea>
				<input type="submit" />
			</form>
		);
	}
})

var data = JSON.parse(localStorage.getItem('todo')) || [];

ReactDOM.render(
	<TodoList data={data}/>,
	document.getElementById('todo')
)