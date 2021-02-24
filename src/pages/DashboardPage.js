import {Page} from "../core/Page";
import {$} from "../core/dom";
export class DashboardPage extends Page {
	getRoot() {
		return $.create("div", "db").html(`<div class="db_header">
					<h1>Excel dashboard</h1>
				</div>
				<div class="db__new">
					<div class="db__view">
						<a href="#" class="db_create">Новая<br />таблица</a>
					</div>
				</div>
				<div class="db__table db_view">
					<div class="db__list-header">
						<span>Название</span>
						<span>Дата открытия</span>
					</div>
					<ul class="db__list">
						<li class="db__record">
							<a href="#">Таблица номер 1</a>
							<strong>12.01.2021</strong>
						</li>
					</ul>
				</div>`);
	}
}