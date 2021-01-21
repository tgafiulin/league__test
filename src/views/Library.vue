<template>
  <div>
    <h2>{{ library.name }}</h2>
    <router-link to="/">Вернуться к списку библиотек</router-link>
    <hr>
    <!-- {{ library }} -->
    <div class="library">
        <div class="section">
            <h2>Общая информация:</h2>
            <div class="info">
                <div class="info__title">Название: </div>
                <div class="info__desc">{{ library.name }}</div>
            </div>
            <div class="info" v-if="library.description">
                <div class="info__title">Описание:</div>
                <div class="info__desc" v-html="library.description"></div>
            </div>
            <div class="info" v-if="library.address.fullAddress">
                <div class="info__title">Адрес:</div>
                <div class="info__desc">{{ library.address.fullAddress }}</div>
            </div>

            <div class="info" v-if="library.tags.length">
                <div class="info__title">Теги:</div>
                <div class="info__desc" v-for="(tag, index) in library.tags" :key="tag.name">{{ tag.name }}<span v-if="index+1 < library.tags.length">,</span></div>
            </div>
        </div>
        <div class="section">
            <h2>Контакты:</h2>
            <div class="info" v-if="library.contacts.website">
                <div class="info__title">Сайт:</div>
                <div class="info__desc"><a v-bind:href="library.contacts.website">{{ library.contacts.website }}</a></div>
            </div>
            <div class="info" v-if="library.contacts.email">
                <div class="info__title">Email:</div>
                <div class="info__desc"><a v-bind:href="'mailto:' + library.contacts.email">{{ library.contacts.email }}</a></div>
            </div>
            <template v-if="library.contacts.phones.length">
                <div class="info" v-for="phone in library.contacts.phones" :key="phone.value">
                    <div class="info__title">Телефон:</div>
                    <div class="info__desc"><a v-bind:href="'tel:' + phone.value">{{ phone.value }}</a></div>
                </div>
            </template>
        </div>

        <div class="section" v-if="library.workingSchedule.length">
            <h2>Время работы:</h2>
            <div class="info" v-for="(day, dayNumber) in library.workingSchedule" :key="day">
                <div class="info__title">{{ days[dayNumber - 1] }}:</div>
                <div class="info__desc">с {{ day.from }} до {{ day.to }}</div>
            </div>
        </div>

        <div class="library__image" v-if="library.image.url">
            <img :src="library.image.url" :alt="library.image.title">
        </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  props: ['library'],
  name: 'Library',
  data() {
    return {
        days: ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']
    }
  }
}
</script>

<style lang="scss">
    .section {
        border-bottom: 1px solid #000;
        padding: 20px 0;
    }

    .info {
        // display: flex;
        margin-bottom: 15px;
        // flex-wrap: wrap;

        &__title {
            font-weight: bold;
            margin-bottom: 10px;
        }

        &__desc {
            padding-right: 5px;

            &:last-child {
                padding-right: 0;
            }

            p:first-child {
                margin-top: 0;
            }
        }
    }

    .library {

        &__image {
            margin-top: 20px;
            max-width: 600px;
            width: 100%;
            height: 500px;
            position: relative;

            img {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }
</style>
